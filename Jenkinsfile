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
    }
}