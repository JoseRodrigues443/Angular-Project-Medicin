export class MedicalRecipe {
    _id: string;
    patient: string;
    doctor: string;
    __v: string;
    recipeDate: string;
    recipeExpirationDate: string;
    /*  prescriptions: string; */
    prescriptions: [{
        "_id": string,  
        "presentation":string,//id presentation
        "drug": string,
        "medicine": string
        "form": string,
        "concentration": string,
        "posology": string,
        "quantity": string,
        "packagesNumber": string,
        "prescribedPosology": string,
        "prescriptionExpirationDate": string,
        dispenses: [{
            "pharmacist": string,
            "dispenseDate": string,
            "dispensedQuantity": string
        }]
    }]
}

