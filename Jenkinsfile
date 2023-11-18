pipeline {
    agent any

    stages {
        stage ('Build Image') {
            steps {
                    script {
                        dockerapp = docker.build("suraydan/cursocna3:v${env.BUILD_ID}", '-f ./Dockerfile .')
                    }
            }
        }
        stage ("Push image") {
            steps {
                script {
                      docker.withRegistry('https://registry.hub.docker.com','dockerhub'){
                      dockerapp.push("v${env.BUILD_ID}")
                      dockerapp.push('latest')
                    }
                }
            }
        }
    }
}