import {User} from'../models/users'
import {DataUsers} from'../types/interfaces'
import * as nodemailer from 'nodemailer'

let designation = " User "
let mydb = User

export let find = async () => {
    let liste = await mydb.find({})
    return liste
}

export let findOne = async (id: number | string) => {
    try{
        console.log('id' , id)
        let find = await mydb.find({_id : id})
        return find
    }catch(e:any){
        console.log(e.message)
        return false
    }   
}

export let update = async (id: number | string) => {
    try{
        console.log('id' , id)
        let edit  = await mydb.updateOne({_id: id },[ { $set: { "verify": true }}])
        return edit
    }catch(e:any){
        console.log(e.message)
        return false
    } 
}

export let findOneByNom = async (nom: string) => {
    console.log(designation , nom)
    let find_nom = await mydb.find({nom : nom})
    return find_nom
}

export let add = async (data: DataUsers) => {
    let nouveau = new mydb({
        nom : data.nom ,
        contact : data.contact ,
        email : data.email,
        password : data.password,
        verify : false
    })
    let add = await mydb.create(nouveau)
    console.log('nouveau ' , designation , 'ajouté :' , nouveau);  
    return add
}

export let sendEmail = async (email: string , sujet: string , nom: any , link: string) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'randriamampionona9@gmail.com',
          pass: '#Lantoniaina9'
        },
        tls:{
          rejectUnauthorized:false
        }
    });
    let mailOptions = {
        from: 'randriamampionona9@gmail.com',
        to: email ,
        subject: sujet,
        html: '<h3>Bonjour '+ nom +'! </h3><p> Cliquer sur ce lien pour activer votre compte </p><a href="'+ link +'">Activation de compte</a>'
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Send Email Succes : ' + info.response);
        }
    });
}
