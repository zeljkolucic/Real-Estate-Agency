import express from 'express';
import Korisnik from '../models/korisnik';

export class KorisnikController {

    prijava = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let lozinka = req.body.lozinka;
        let tip = req.body.tip;
        Korisnik.findOne({'korisnickoIme': korisnickoIme, 'lozinka': lozinka, 'tip': tip}, (err, korisnik) => {
            if(err) console.log(err);
            else res.json(korisnik);
        })
    }

    dohvatiKorisnika = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        Korisnik.findOne({'korisnickoIme' : korisnickoIme}, (err, korisnik) => {
            if(err) console.log(err);
            else res.json(korisnik);
        })
    }

    dodajKorisnika = (req: express.Request, res: express.Response) => {
        Korisnik.find({}, (err, korisnici) => {
            if(err) console.log(err);
            else {
                let korisnik = new Korisnik(req.body);
                if(korisnici) {
                    korisnik.set('idK', korisnici.length + 1);
                } else {
                    korisnik.set('idK', 1);
                }
                korisnik.save().then((korisnik) => {
                    res.status(200).json({'message': 'korisnik dodat'});
                }).catch((err) => {
                    res.status(400).json({'message': err});
                })
            }
        }) 
    }

    dohvatiSveKorisnike = (req: express.Request, res: express.Response) => {
        Korisnik.find({$or: [{'tip': 'registrovani korisnik'}, {'tip': 'radnik agencije'}]}, (err, korisnici) => {
            if(err) console.log(err);
            else res.json(korisnici);
        })
    }

    azurirajKorisnika = (req: express.Request, res: express.Response) => {
        let staroKorisnickoIme = req.body.staroKorisnickoIme;
        let novoKorisnickoIme = req.body.novoKorisnickoIme;
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let slika = req.body.slika;
        let adresa = req.body.adresa;
        let gradDrzava = req.body.gradDrzava;
        Korisnik.collection.updateOne({'korisnickoIme': staroKorisnickoIme}, {$set: {'korisnickoIme': novoKorisnickoIme, 
            'ime': ime, 'prezime': prezime, 'slika': slika, 'adresa': adresa, 'gradDrzava': gradDrzava}}, err => {
                if(err) console.log(err);
            })
    }

    ukloniKorisnika = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        Korisnik.collection.deleteOne({'korisnickoIme': korisnickoIme});
    }

    promeniLozinku = (req: express.Request, res: express.Response) => {
        let novaLozinka = req.body.novaLozinka;
        let korisnickoIme = req.body.korisnickoIme;
        Korisnik.collection.updateOne({'korisnickoIme': korisnickoIme}, {$set: {'lozinka': novaLozinka}}, (err, korisnik) => {
            if(err) console.log(err);
            else res.json(korisnik);
        })
    }

}