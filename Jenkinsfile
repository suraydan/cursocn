pipeline {
    agent any
 
    stages {
        stage ('Build Image') {
            steps {
                script {
                    dockerapp = docker.build("matheusmprado/sampletodojenkins:${env.BUILD_ID}", '-f ./dockerfile .')
                }
            }
        }
    }
}