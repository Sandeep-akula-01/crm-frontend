
pipeline {
    agent any

    environment {
        IMAGE_NAME = "sandeepakula01/crm"
        REGISTRY_CREDENTIALS = "dockerhub-creds"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    credentialsId: 'github-creds',
                    url: 'https://github.com/Sandeep-akula-01/crm-frontend.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('SonarQube Scan') {
            steps {
                withCredentials([string(credentialsId: 'sonar-cred', variable: 'SONAR_TOKEN')]) {
                    withSonarQubeEnv('sonar-server') {
                        sh '''
                        npx sonar-scanner \
                          -Dsonar.projectKey=crm-frontend \
                          -Dsonar.sources=. \
                          -Dsonar.login=$SONAR_TOKEN
                        '''
                    }
                }
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }
		stage('Build Docker Image') {
	steps {
		sh 'docker build -t $IMAGE_NAME:${BUILD_NUMBER} .'
			}
		}
		stage('Push Docker Image') {
    steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', 
                                           usernameVariable: 'DOCKER_USER', 
                                           passwordVariable: 'DOCKER_PASS')]) {
            sh '''
            echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
            docker push $IMAGE_NAME:${BUILD_NUMBER}
            '''
        }
    }
}

        stage('Update K8s Manifest') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'github-creds',
                    usernameVariable: 'GIT_USER',
                    passwordVariable: 'GIT_PASS')]) {

                    sh '''
                    sed -i "s|image:.*|image: $IMAGE_NAME:${BUILD_NUMBER}|" k8s/crm-deployment.yaml

                    git config --global user.email "sandeepsandy958168@gmail.com"
                    git config --global user.name "Sandeep-akula-01"

                    git add k8s/crm-deployment.yaml
 
                    git commit -m "Updated image to build ${BUILD_NUMBER}"

                    git push https://$GIT_USER:$GIT_PASS@github.com/Sandeep-akula-01/crm-frontend.git
                    '''
                }
            }
        }
    }
}
