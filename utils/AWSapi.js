import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from 'react-native-dotenv'
import awsMapping from './AWSmapping.json'


/* Leverage JSON file */
const meditationsKey = (appContext) => {
    return 'meditations/'.concat(awsMapping.Default['nkt-mobile-app-content'].meditationsJSON)
}, 
adviceKey = (appContext) => {
    return 'advice/'.concat(awsMapping.Default['nkt-mobile-app-content'].adviceJSON)
},
AWS_BUCKET = 'nkt-mobile-app-content'

/* AWS Connection */
const AWS = require('aws-sdk')
AWS.config.update({
    region: 'us-east-1',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
})
const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
})

module.exports = {
    getMeditations: async (appContext) => {
        const update = (objectData) => {
            appContext.setState({ meditationsResult: objectData })
        },
        obj = {
            'Bucket': AWS_BUCKET,
            'Key': meditationsKey(appContext)
        }
        
        s3.getObject(obj, (err, data) => {
            if (err) return err;
            let objectData = JSON.parse(data.Body.toString('utf-8')); // Use the encoding necessary
            update(objectData)
        });
    },
    getAdvice: async (appContext) => {
        const update = (objectData) => {
            appContext.setState({ dharmaResult: objectData })
        },
        obj = {
            'Bucket': AWS_BUCKET,
            'Key': adviceKey(appContext)
        }
        
        s3.getObject(obj, (err, data) => {
            if (err) return err;
            let objectData = JSON.parse(data.Body.toString('utf-8')); // Use the encoding necessary
            update(objectData)
        });
    }
}