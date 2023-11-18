pipeline {
    agent any

    stage {
        stage ('Build Image') {
            steps {
                    script {
                        dockerapp = docker.build("suraydan/cursocnA3:v${env.BUILD_ID}", '-f ./Dockerfile .')
                    }
            }
        }
    }
}