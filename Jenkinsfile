pipeline {
    agent { label 'agent_server' }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials') 
        ZAP_SERVER = credentials('zap-server-url')
        SONAR_SERVER = credentials('sonarqube-server-url')
        STAGING_SERVER = 'http://192.168.230.101:8080'
        SNYK_TOKEN = credentials('snyk-api-token')
        SONAR_TOKEN = credentials('g67_se490_spr25')
    }

    stages {
        stage('Info') {
            steps {
                sh(script: """ whoami;pwd;ls """, label: "first stage")
            }
        }

        stage('SonarQube Scan') {
            steps {
                script {
                    dir('plsh-fe-librarian') {
                        withSonarQubeEnv('Sonarqube server connection') {
                            sh 'npm install --legacy-peer-deps'
                            sh '''
                                npx @sonar/scan \
                                -Dsonar.projectKey=plsh-fe-librarian \
                                -Dsonar.sources=. \
                                -Dsonar.host.url=$SONAR_SERVER \
                                -Dsonar.token=$SONAR_TOKEN
                            '''
                        }

                        def timestamp = new Date().format("yyyyMMdd_HHmmss")
                        env.TIMESTAMP = timestamp

                        sh "curl -u $SONAR_TOKEN: \"$SONAR_SERVER/api/issues/search?componentKeys=plsh-fe-librarian&impactSeverities=HIGH,MEDIUM&statuses=OPEN,CONFIRMED\" -o issues_${timestamp}.json"

                        sh "python3 convert_issue_json.py issues_${timestamp}.json sonarqube-report-${timestamp}.html"

                        archiveArtifacts artifacts: "sonarqube-report-${timestamp}.html", fingerprint: true
                    }
                }
            }
        }

        stage('Snyk Scan') {
            steps {
                dir('plsh-fe-librarian') {
                    script {
                        sh 'npm install yarn --legacy-peer-deps'
                        sh 'npx yarn install || true'
                        sh 'snyk config set api=$SNYK_TOKEN'
                        def timestamp = new Date().format("yyyyMMdd_HHmmss")
                        sh """
                            snyk test --severity-threshold=high --json-file-output=snyk.json || true
                            [ -f snyk.json ] && snyk-to-html -i snyk.json -o snyk-report-${timestamp}.html || true
                        """
                        archiveArtifacts artifacts: "snyk-report-${timestamp}.html", fingerprint: true
                    }
                }
            }
        }

        stage('Build Image') {
            steps {
                dir('plsh-fe-librarian') {
                    script {
                        sh '''
                            # Build Docker image cho frontend
                            docker build -t plsh-fe-librarian .
                            docker tag plsh-fe-librarian co0bridae/plsh-fe-librarian:latest
                        '''
                    }
                }
            }
        }

        stage('Trivy Scan') {
            steps {
                script {
                    def timestamp = new Date().format("yyyyMMdd_HHmmss")
                    env.TIMESTAMP = timestamp

                    sh """
                        trivy image --timeout 10m --format json --output plsh-fe-trivy-${timestamp}.json --severity HIGH,CRITICAL plsh-fe-librarian:latest
                        python3 convert_json.py plsh-fe-trivy-${timestamp}.json plsh-fe-trivy-${timestamp}.html
                    """
                    archiveArtifacts artifacts: "plsh-fe-trivy-${timestamp}.html", fingerprint: true
                }
            }
        }


        stage('Push Image to Docker Hub') {
            steps {
                script {
                    sh '''
                        # Đăng nhập Docker Hub
                        echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin

                        # Tag và push image frontend
                        docker tag plsh-fe-librarian co0bridae/plsh-fe-librarian:latest
                        docker push co0bridae/plsh-fe-librarian:latest
                    '''
                }
            }
        }


        stage('Deploy to Staging') {
            steps {
                script {
                    def deploying = """
                        #!/bin/bash

                        docker ps -q --filter "name=plsh-fe-librarian" && docker stop plsh-fe-librarian || true
                        docker ps -a -q --filter "name=plsh-fe-librarian" && docker rm plsh-fe-librarian || true

                        docker pull co0bridae/plsh-fe-librarian:latest

                        docker run -d \\
                        --name plsh-fe-librarian \\
                        -p 8080:8080 \\
                        -e NEXTAUTH_SECRET=84c63ac9-a8a2-43d4-a0d0-217dfbc1f7a7 \\
                        co0bridae/plsh-fe-librarian:latest
                    """

                    // Gửi script qua SSH và chạy
                    sshagent(['jenkins-ssh-key']) {
                        sh """
                            ssh -o StrictHostKeyChecking=no root@192.168.230.101 'echo "${deploying}" > /root/deploy.sh && chmod +x /root/deploy.sh && /root/deploy.sh'
                        """
                    }
                }
            }
        }


        stage('ZAP Scan') {
            steps {
                script {
                    def timestamp = new Date().format("yyyyMMdd_HHmmss")

                    sh """
                        cd /opt/zaproxy
                        ./zap.sh -daemon -port 8090 -host 0.0.0.0 \\
                        -config api.disablekey=true \\
                        -config api.addrs.addr.name=127.0.0.1 \\
                        -config api.addrs.addr.regex=true &
                        sleep 30

                        curl -s "http://127.0.0.1:8090/JSON/spider/action/scan/?url=http://192.168.230.101:8080"
                        sleep 30

                        curl -s "http://127.0.0.1:8090/JSON/ascan/action/scan/?url=http://192.168.230.101:8080"
                        sleep 60

                        curl -s "http://127.0.0.1:8090/OTHER/core/other/htmlreport/" -o "${WORKSPACE}/zap_report-${timestamp}.html"

                        curl -s "http://127.0.0.1:8090/JSON/core/action/shutdown/"
                    """

                    archiveArtifacts artifacts: "zap_report-${timestamp}.html", fingerprint: true
                }
            }
        }








    }

}

