import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from 'react-native-dotenv'
import awsMapping from './AWSmapping.json'

/* Leverage JSON file */
const meditationsKey = () => {
    return 'meditations/'.concat(awsMapping.Default['nkt-app-content'].meditationsJSON)
}, 
adviceKey = () => {
    return 'advice/'.concat(awsMapping.Default['nkt-app-content'].adviceJSON)
},
credentialsKey = (locationInfo) => {
    let { country, state, city } = locationInfo
    state = 'colorado'
    city = 'denver'

    return userDistanceKm > 0 ? `google-calendar-api/${country}/${state}/${city}/credentials.json` :    `google-calendar-api/credentials.json`
},
AWS_CONTENT_BUCKET = 'nkt-app-content'
AWS_CREDENTIALS_BUCKET = 'mobile-app-credentials'

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
    getMeditations: async () => {
        const obj = {
            'Bucket': AWS_CONTENT_BUCKET,
            'Key': meditationsKey()
        }
        
        return s3.getObject(obj, (err, data) => {
            if (err) return err
            return data
        });
    },
    getAdvice: async () => {
        const obj = {
            'Bucket': AWS_CONTENT_BUCKET,
            'Key': adviceKey()
        }
        
        return s3.getObject(obj, (err, data) => {
            if (err) return err
            return data
        });
    },
    getCenters: async (locationInfo) => {
        const params = {
            'Bucket': 'center-info', //AWS_CREDENTIALS_BUCKET,
            'Key': 'credentials.json' //credentialsKey(locationInfo)
        }
        
        return await s3.getObject(params, (err) => {
            if (err) {
                // console.log(err)
            }
        }).promise()
    }
}