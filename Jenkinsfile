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

                        // Kết nối SonarQube qua Jenkins config
                        withSonarQubeEnv('Sonarqube server connection') {

                            // Cài dependencies nếu chưa có
                            sh 'npm install --legacy-peer-deps'

                            // Thực hiện scan bằng sonar-scanner
                            sh '''
                                npx @sonar/scan \
                                -Dsonar.projectKey=plsh-fe-librarian \
                                -Dsonar.sources=. \
                                -Dsonar.host.url=$SONAR_SERVER \
                                -Dsonar.token=$SONAR_TOKEN
                            '''
                        }

                        // Tạo timestamp để phân biệt báo cáo
                        def timestamp = new Date().format("yyyyMMdd_HHmmss")
                        env.TIMESTAMP = timestamp

                        // Truy vấn issues từ Sonar API (HIGH + MEDIUM severity, status OPEN hoặc CONFIRMED)
                        sh "curl -u $SONAR_TOKEN: \"$SONAR_SERVER/api/issues/search?componentKeys=plsh-fe-librarian&impactSeverities=HIGH,MEDIUM&statuses=OPEN,CONFIRMED\" -o issues_${timestamp}.json"

                        // Chuyển đổi sang HTML (nhớ có sẵn file Python convert_issue_json.py)
                        sh "python3 convert_issue_json.py issues_${timestamp}.json sonarqube-report-${timestamp}.html"

                        // Lưu artifact để xem hoặc tải
                        archiveArtifacts artifacts: "sonarqube-report-${timestamp}.html", fingerprint: true
                    }
                }
            }
        }

        stage('Snyk Scan') {
            steps {
                dir('plsh-fe-librarian') {
                    script {
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







    }

}

