import express from 'express';
import Ponuda from '../models/ponuda';


export class PonudaController {

    dodajPonudu = (req: express.Request, res: express.Response) => {
        Ponuda.find({}, (err, ponude) => {
            if(err) console.log(err);
            else {
                let ponuda = new Ponuda(req.body);
                if(ponude) {
                    ponuda.set('idP', ponude.length + 1);
                } else {
                    ponuda.set('idP', 1);
                }
                ponuda.save().then((ponuda) => {
                    res.status(200).json({'message': 'ponuda dodata'});
                }).catch((err) => {
                    res.status(400).json({'message': err});
                })
            }
        })
    }

    dohvatiPonude = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        Ponuda.find({'vlasnik': korisnickoIme, 'pregledana': false}, (err, ponude) => {
            if(err) console.log(err);
            else res.json(ponude);
        })
    }

    prihvatiPonudu = (req: express.Request, res: express.Response) => {
        let idP = req.body.idP;
        Ponuda.collection.updateOne({'idP': idP}, {$set: {'pregledana': true, 'prihvacena': true}}, err => {
            if(err) console.log(err);
        })
    }

    odbijPonudu = (req: express.Request, res: express.Response) => {
        let idP = req.body.idP;
        Ponuda.collection.updateOne({'idP': idP}, {$set: {'pregledana': true, 'prihvacena': false}}, err => {
            if(err) console.log(err);
        })
    }

    odbijOstalePonude = (req: express.Request, res: express.Response) => {
        let idN = req.body.idN;
        Ponuda.collection.updateMany({'idN': idN, 'pregledana': false}, {$set: {'pregledana': true, 'prihvacena': false}}, err => {
            if(err) console.log(err);
        })
    }

    dohvatiUgovoreneProdaje = (req: express.Request, res: express.Response) => {
        Ponuda.find({'prihvacena': true}, (err, ugovoreneProdaje) => {
            if(err) console.log(err);
            else res.json(ugovoreneProdaje);
        })
    }

    proveriDostupnost = (req: express.Request, res: express.Response) => {
        let idN = req.body.idN;
        let datumOd = req.body.datumOd;
        let datumDo = req.body.datumDo;
        console.log(datumOd + ' ' + datumDo);
        Ponuda.find({'idN': idN, 'prihvacena': true, $or: [
                        { 'datumOd': { $gte: datumOd, $lte: datumDo } }, 
                        { 'datumDo': { $gte: datumOd, $lte: datumDo } },
                        { $and: [{ 'datumOd': { $lte: datumOd }, 'datumDo': { $gte: datumDo } }] },
                        { $and: [{ 'datumOd': { $gte: datumOd }, 'datumDo': { $lte: datumDo } }] }
                    ]}, (err, ponude) => {
                    if (err) console.log(err);
                    else {
                        if (ponude.length != 0) {
                            res.status(200).json({'poruka': 'nedostupna' });
                        } else {
                            res.status(200).json({'poruka': 'dostupna' });
                        }
                    }
            }
        )
    }

    proveriDaLiJeProdata = (req: express.Request, res: express.Response) => {
        let idN = req.body.idN;
        Ponuda.findOne({'idN': idN, 'prihvacena': true}, (err, ponuda) => {
            if(err) console.log(err);
            else {
                if(ponuda != null) {
                    res.status(200).json({'poruka': 'prodata'});
                } else {
                    res.status(200).json({'poruka': 'dostupna'});
                }
                
            }
        })
    }

}