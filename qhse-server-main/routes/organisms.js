import { Router as _Router } from 'express';
const organismRouter = _Router();


const OrganismRouter = _Router();

import Organism from '../models/Organism.js';

OrganismRouter.post('/create', async (req, res) => {
    
                const newOrganism = new Organism({
                    name: req.body.name,
                    user: req.body.user,
                    site_num: req.body.site_num,
                    creation_date: req.body.creation_date,
                    domaines: req.body.domaines,
                    tel: req.body.tel,
                    Adresse: req.body.Adresse,
                    Carte: req.body.Carte,
                });
                
                const cuser = await newOrganism.save(function(){});  
                res.status(201).json(cuser);

});

OrganismRouter.put("/:orgId", async (req, res) => {
  try{
    const updatedorganism = await Organism.findByIdAndUpdate({_id: req.params.orgId},{
          name: req.body.name,
          site_num: req.body.site_num,
          creation_date: req.body.creation_date,
          domaines: req.body.domaines,
          tel: req.body.tel,
          Adresse: req.body.Adresse,
          Carte: req.body.Carte,
          date: req.body.date, 
    });
    res.status(200).json("Organism had been updated");
  } catch (err) {
    res.status(500).json(err);
  }
})

OrganismRouter.get('/:orgId', async (req, res) => {
    try {
        const orgs = await Organism.findOne({_id:req.params.orgId});
        res.status(200).json(orgs);
      } catch (err) {
        res.status(500).json(err);
      }
});
OrganismRouter.get('/a/:userId', async (req, res) => {
    try {
        const orgs = await Organism.find({user:req.params.userId});
        res.status(200).json(orgs);
      } catch (err) {
        res.status(500).json(err);
      }
});

OrganismRouter.delete('/:orgId', async (req, res) => {
    try {
        const orgs = await Organism.findOne({_id:req.params.orgId});
        await orgs.deleteOne();
        res.status(200).json("The organism has been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
});

export default OrganismRouter;
