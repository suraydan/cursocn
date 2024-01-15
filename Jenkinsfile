pipeline {
    agent any
 
    stages {
        stage ('Build Image') {
            steps {
                script {
                    dockerapp = docker.build("suraydan/cursojenkins:${env.BUILD_ID}", '-f ./dockerfile .')
                }
            }
        }
        stage ("Push image") {
            steps {
                script {
                      docker.withRegistry('https://registry.hub.docker.com','dockerhub'){
                        dockerapp.push("${env.BUILD_ID}")
                        dockerapp.push('latest')
                    }
                }
            }
        }
    }
}