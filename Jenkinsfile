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
    }
}