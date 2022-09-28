import { Router as _Router } from 'express';

const PersonnelRouter = _Router();

import Personnel from '../models/Personnel.js';
import Zone from '../models/Zone.js';

PersonnelRouter.post('/create', async (req, res)=>{
    const newPersonnel = await new Personnel({
        _id: req.body._id,
        nom: req.body.nom,
        prenom: req.body.prenom,
        naissance: req.body.naissance,
        cin: req.body.cin,
        metier: req.body.metier,
        photo: req.body.photo,
    })
    
    const cuser = await newPersonnel.save(function(){});  
    res.status(201).json(cuser);
})

PersonnelRouter.get('/:personId', async (req, res)=>{
    try{
        const personnel = await Personnel.findOne({_id:req.params.personId});
        res.status(200).json(personnel);
    } catch(err){
        res.status(500).json(err);
    }
})

PersonnelRouter.put('/:personId', async (req, res)=>{
    try{
        const updatedPersonnel = await Personnel.findByIdAndUpdate({_id:req.params.personId}, {
            nom: req.body.nom,
            prenom: req.body.prenom,
            naissance: req.body.naissance,
            cin: req.body.cin,
            metier: req.body.metier,
            photo: req.body.photo,
        });
        res.status(200).json("Personnel had been updated");
    } catch(err) {
        res.status(500).json(err);
    }
})

PersonnelRouter.get('/a/:userId', async (req, res)=>{
    try{
        const persons = await Personnel.find({user:req.params.userId});
        res.status(200).json(persons);
      } catch (err) {
        res.status(500).json(err);
    }
})

PersonnelRouter.delete('/:personId', async (req, res)=>{
    try{
        const deletedPersonnel = await Personnel.findByIdAndDelete({_id: req.params.personId});
        res.status(200).json("The organism has been deleted");
    } catch (err) {
        res.status(500).json(err);
    }
})

export default PersonnelRouter;