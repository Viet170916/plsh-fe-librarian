pipeline {
    agent { label 'agent_server' }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials') 
        ZAP_SERVER = credentials('zap-server-url')
        SONAR_SERVER = credentials('sonarqube-server-url')
        SNYK_TOKEN = credentials('snyk-api-token')
        SONAR_TOKEN = credentials('g67_se490_spr25')
        NEXTAUTH_SECRET = credentials('nextauth-secret')
        TELEGRAM_BOT_TOKEN = credentials('telegram-bot-token')   
        TELEGRAM_CHAT_ID = credentials('telegram-chat-id')
    }

    stages {
        stage('Info') {
            steps {
                sh(script: """ whoami;pwd;ls """, label: "first stage")
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

/*        stage('SonarQube Scan') {
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
                        sleep 30

                        def timestamp = new Date().format("yyyyMMdd_HHmmss")
                        env.TIMESTAMP = timestamp

                        sh "curl -u $SONAR_TOKEN: \"$SONAR_SERVER/api/issues/search?componentKeys=plsh-fe-librarian&impactSeverities=BLOCKER,HIGH,MEDIUM&statuses=OPEN,CONFIRMED\" -o issues_${timestamp}.json"

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
                            snyk test --json-file-output=snyk.json || true
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
                        trivy image --timeout 10m --format json --output plsh-fe-trivy-${timestamp}.json plsh-fe-librarian:latest
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
        }*/


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
                        -e NEXTAUTH_SECRET=${env.NEXTAUTH_SECRET}  \\
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
                    env.TIMESTAMP = timestamp

                    // Run ZAP Scan
                    sh """
                        cd /opt/zaproxy
                        ./zap.sh -daemon -port 8090 -host 0.0.0.0 \\
                        -config api.disablekey=true \\
                        -config api.addrs.addr.name=127.0.0.1 \\
                        -config api.addrs.addr.regex=true &
                        sleep 60

                        curl -s "http://127.0.0.1:8090/JSON/spider/action/scan/?url=http://192.168.230.101:8080"
                        sleep 30

                        curl -s "http://127.0.0.1:8090/JSON/ascan/action/scan/?url=http://192.168.230.101:8080"
                        sleep 60

                        curl -s "http://127.0.0.1:8090/OTHER/core/other/htmlreport/" -o "${WORKSPACE}/zap_report-${timestamp}.html"
                        curl -s "http://127.0.0.1:8090/OTHER/core/other/jsonreport/" -o "${WORKSPACE}/zap_report-${timestamp}.json"

                        curl -s "http://127.0.0.1:8090/JSON/core/action/shutdown/"
                    """

                    // Lưu HTML report
                    archiveArtifacts artifacts: "zap_report-${timestamp}.html", fingerprint: true

                    // Đọc file JSON
                    def zapData = readJSON file: "zap_report-${timestamp}.json"
                    def highCount = 0
                    def mediumCount = 0

                    zapData.alerts.each { alert ->
                        if (alert.risk == "High") {
                            highCount++
                        } else if (alert.risk == "Medium") {
                            mediumCount++
                        }
                    }

                    if (highCount > 0 || mediumCount > 0) {
                        echo "ZAP phát hiện ${highCount} lỗi High và ${mediumCount} lỗi Medium!"

                        def msg = URLEncoder.encode("⚠️ Pipeline Lab_iap491/G76_SEP490_SPR25_/PLSH-FE-LIBRARIAN Failed. ZAP phát hiện ${highCount} lỗi High và ${mediumCount} lỗi Medium. Xem báo cáo đính kèm.", "UTF-8")

                        // Gửi message Telegram
                        sh """
                            curl -s -X POST https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage \\
                            -d chat_id=${TELEGRAM_CHAT_ID} \\
                            -d text="${msg}"
                        """

                        // Gửi file báo cáo HTML
                        sh """
                            curl -s -X POST https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument \\
                            -F chat_id=${TELEGRAM_CHAT_ID} \\
                            -F document=@zap_report-${timestamp}.html
                        """

                        error("Dừng pipeline vì ZAP phát hiện lỗi nghiêm trọng.")
                    } else {
                        echo "ZAP không phát hiện lỗi High hoặc Medium."
                    }
                }
            }
        }


    }

}

