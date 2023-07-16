import axios from 'react-native-axios'

const BaseUrl = "https://techninza.in/tagdaraho/api2/public/index.php"

export const getAppData = async (id, setFetching, setAppData) => {

    setFetching({ type: 'setLoading', value: true })

    // # 1 get transactions
    getPackages(id,setAppData)

    // # 2 get transactions
    let form = new FormData()
    form.append('trainer_id', id)
    form.append('status', 'active')
    await axios.post(BaseUrl + "/trainer_transaction", form, {
        headers: { "Content-type": "multipart/form-data" }
    })
        .then((response) => {
            console.log(response.data.msg, 'trainer_transaction Api successful')
            if (response.data.status === 200) {
                setAppData({ type: 'setTransactions', value: response.data.msg })
            }
        })
        .catch((error) => {
            console.log(error, 'error while fetching trainer_transaction Api')
        })

    //#3 get expired txns
    getExpiredTxns(id, setAppData)

    setFetching({ type: 'setLoading', value: false })

}

const getPackages = async (id, setAppData) => {
    let form = new FormData()
    form.append('trainer_id', id)
    await axios.post(BaseUrl + "/get_classpkg_by_trainer", form, {
        headers: { "Content-type": "multipart/form-data" }
    })
        .then((response) => {
            console.log(response.data.msg, 'get_classpkg_by_trainer Api successful')
            if (response.data.status === 200) {
                setAppData({ type: 'setPackages', value: response.data.msg })
            }
        })
        .catch((error) => {
            console.log(error, 'error while fetching get_classpkg_by_trainer Api')
        })

}

const getExpiredTxns = async (id, setAppData) => {
    let form = new FormData()
    form.append('trainer_id', id)
    form.append('status', 'expired')
    await axios.post(BaseUrl + "/trainer_transaction", form, {
        headers: { "Content-type": "multipart/form-data" }
    })
        .then((response) => {
            console.log(response.data.msg, 'trainer_transaction Api successful')
            if (response.data.status === 200) {
                setAppData({ type: 'setExpiredTxns', value: response.data.msg })
            }
        })
        .catch((error) => {
            console.log(error, 'error while fetching trainer_transaction Api')
        })

}