pipeline {
    agent { label 'agent_server' }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials') 
        ZAP_SERVER = credentials('zap-server-url')
        SONAR_SERVER = credentials('sonarqube-server-url')
        STAGING_SERVER = credentials('staging-server-url')
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
                        sh 'npm install -g yarn'
                        sh 'yarn install || true'
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










    }

}

