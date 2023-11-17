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
        stage ("Push image") {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com','dockerhub'){
                        dockerapp.push('latest')
                        dockerapp.push("${env.BUILD_ID}")
                    }
                }
            }
        }

        stage ("Deploy Kubernetes") {
            steps {
                withKubeConfig([credentialsId: 'kubeconfig']) {
                    sh "kubectl apply -f ./k8s/deployment.yaml"
                }
            }
        }

        stage ("Deploy Kubernetes") {
            steps {
                withKubeConfig([credentialsId: 'kubeconfig']) {
                    sh "kubectl set image deployment/web web=matheusmprado/sampletodojenkins:${env.BUILD_ID}"
                }
            }
        }
    }
}