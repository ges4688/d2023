var RealStateService = require('../services/realstate.service');
var RealStateImgService =require('../services/realstateImg.service');
const RealState = require('../models/realstate.model');

_this = this;

exports.getRealState = async function (req, res, next) {

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    try {
        var RealState = await RealStateService.getRealState(req.params.token)
        return res.status(200).json({status: 200, data: RealState, message: "Succesfully RealState Recieved"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getRealStateById=async function (req,res){
    var userId=req.body.id ? req.body.id:-1;
    if(userId!=-1){
        try{
        var RealStateReturn=await RealStateService.getRealStatesById(userId);
        return res.status(200).json({status:200,data:RealStateReturn,message:"Inmobiliaria recibida con exito"})
        }catch(e){
            return res.status(400).json({status:400,message:e.message})
        }   
    }

}


exports.createRealState = async function (req, res, next) {
    console.log("llegue al controller",req.body)
    var RealState = {
        fantasyName: req.body.RealState.fantasyName,
        email: req.body.RealState.email,
        emailContact: req.body.RealState.emailContact,  
        password: req.body.RealState.password
    }
    try {
        var createdRealState = await RealStateService.createRealState(RealState)
        return res.status(201).json({createdRealState, message: "Succesfully Created RealState"})
    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "RealState Creation was Unsuccesfull"})
    }
}

exports.updateRealState = async function (req, res, next) {
      // Id is necessary for the update
      if (!req.body._id) {
        return res.status(400).json({status: 400., message: "Id must be present"})
    }
    var newRealState = {
        token: req.body.RealState.token,
        fantasyName: req.body.RealState.fantasyName,
        password: req.body.RealState.password
    }
    var userId= req.body._id;
    var RealState = {
        userId,
        fantasyName: req.body.fantasyName ? req.body.fantasyName : null,
        email: req.body.email ? req.body.email : null,
        emailContact: req.body.emailContact ? req.body.emailContact : null,
        

    }
    try {
        var updatedEmpresa = await EmpresaService.updateEmpresa(Empresa)
        return res.status(200).json({status: 200, data: updatedEmpresa, message: "Empresa actualizada correctamente"})
    } catch (e) {
        re
}

exports.removeRealState = async function (req, res, next) {
    var id = req.params.id;
    try {
        var deleted = await RealStateService.deleteRealState(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.loginRealState = async function (req, res, next) {
    console.log("body",req.body);
    var RealState = req.body.RealState;
    try {
        var loginRealState = await RealStateService.loginRealState(RealState);
        return res.status(201).json({loginRealState, message: "Succesfully login"})
    } catch (e) {
        return res.status(400).json({status: 400, message: "Invalid RealStatename or password"})
    }
}

exports.guardarImagenRealState = async function (req, res, next) {
    console.log("ImgRealState",req.body)
    // Id is necessary for the update
    if (!req.body.email) {
        return res.status(400).json({status: 400., message: "Mail must be present"})
    }

    let RealStateImg = {
        email: req.body.email,
        nombreImagen : req.body.nombreImagen
    }
    
    try {
        if (RealStateImg.nombreImagen!=='')
        {
            var newRealStateImg = await RealStateImgService.createRealStateImg(RealStateImg);
        }
        
        return res.status(201).json({status: 201, message: "Imagen cargada"});
        
    } catch (e) {
        console.log("error guardar imagen",e)
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.updateAtributesRealState = async function (req, res, next) {
    var newRealState = {
        token: req.body.RealState.token,
        name: req.body.RealState.name,
        password: req.body.RealState.password
    }
    try {
        var oldRealState = await RealStateService.getRealState(newRealState.token);
        var updatedRealState = await RealStateService.updateRealState(oldRealState, newRealState);
        return res.status(200).json({status: 200, data: updatedRealState, message: "Succesfully Updated RealState"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}