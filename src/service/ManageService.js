import axios from "axios";
import {
    AllCategories, AllInput,
    AllOutPut,
    ExpenseInUser, OutPut,
    TotalInputThisMonth,
    TotalOutputThisMonth,
    YearlyRevenues
} from "../API/api";
import {Input} from "postcss";
    const ManageService = {
    TotalInputMonth: () => {
        return new Promise((resolve, reject) => {
            axios.get(TotalInputThisMonth,
                {
                headers: {
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem('userToken')),
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    resolve(response);
                  console.log(response)
                })
                .catch(function (err) {
                    reject(err)
                });
        });
    },
        TotalOutputMonth: () => {
            return new Promise((resolve, reject) => {
                axios.get(TotalOutputThisMonth,
                    {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(localStorage.getItem('userToken')),
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                        resolve(response);
                        console.log(response)
                    })
                    .catch(function (err) {
                        reject(err)
                    });
            });
        },
        ExpenseInUserLog: () => {
            return new Promise((resolve, reject) => {
                axios.get(ExpenseInUser,
                    {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(localStorage.getItem('userToken')),
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                        resolve(response);
                        console.log(response)
                    })
                    .catch(function (err) {
                        reject(err)
                    });
            });
        },
        GetYearlyRevenues: () => {
            return new Promise((resolve, reject) => {
                axios.get(YearlyRevenues,
                    {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(localStorage.getItem('userToken')),
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                        resolve(response);
                        console.log(response)
                    })
                    .catch(function (err) {
                        reject(err)
                    });
            });
        },
        GetAllCategories: () => {
            return new Promise((resolve, reject) => {
                axios.get(AllCategories,
                    {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(localStorage.getItem('userToken')),
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                        resolve(response);
                        console.log(response)
                    })
                    .catch(function (err) {
                        reject(err)
                    });
            });
        },
        GetAllOutPut: () => {
            return new Promise((resolve, reject) => {
                axios.get(AllOutPut,
                    {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(localStorage.getItem('userToken')),
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                        resolve(response);
                        console.log(response)
                    })
                    .catch(function (err) {
                        reject(err)
                    });
            });
        },
        GetAllInput: () => {
            return new Promise((resolve, reject) => {
                axios.get(AllInput,
                    {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(localStorage.getItem('userToken')),
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                        resolve(response);
                        console.log(response)
                    })
                    .catch(function (err) {
                        reject(err)
                    });
            });
        },
        GetInput: () => {
            return new Promise((resolve, reject) => {
                axios.get(Input,
                    {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(localStorage.getItem('userToken')),
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                        resolve(response);
                        console.log(response)
                    })
                    .catch(function (err) {
                        reject(err)
                    });
            });
        },
        GetOutPut: () => {
            return new Promise((resolve, reject) => {
                axios.get(OutPut,
                    {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(localStorage.getItem('userToken')),
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                        resolve(response);
                        console.log(response)
                    })
                    .catch(function (err) {
                        reject(err)
                    });
            });
        },
}
export default ManageService;
