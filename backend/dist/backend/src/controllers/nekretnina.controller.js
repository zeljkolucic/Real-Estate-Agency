"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NekretninaController = void 0;
const nekretnina_1 = __importDefault(require("../models/nekretnina"));
class NekretninaController {
    constructor() {
        this.dohvatiSveNekretnine = (req, res) => {
            nekretnina_1.default.find({}, (err, nekretnine) => {
                if (err)
                    console.log(err);
                else
                    res.json(nekretnine);
            });
        };
        this.dohvatiNeodobreneNekretnine = (req, res) => {
            nekretnina_1.default.find({ 'odobrena': false }, (err, nekretnine) => {
                if (err)
                    console.log(err);
                else
                    res.json(nekretnine);
            });
        };
        this.dohvatiOdobreneNekretnine = (req, res) => {
            nekretnina_1.default.find({ 'odobrena': true }, (err, nekretnine) => {
                if (err)
                    console.log(err);
                else
                    res.json(nekretnine);
            });
        };
        this.dohvatiPromovisaneNekretnine = (req, res) => {
            nekretnina_1.default.find({ 'promovisana': true }, (err, nekretnine) => {
                if (err)
                    console.log(err);
                else
                    res.json(nekretnine);
            });
        };
        this.dohvatiMojeNekretnine = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            nekretnina_1.default.find({ 'vlasnik': korisnickoIme }, (err, nekretnine) => {
                if (err)
                    console.log(err);
                else
                    res.json(nekretnine);
            });
        };
        this.dohvatiNekretninuPoId = (req, res) => {
            let idN = req.body.idN;
            nekretnina_1.default.findOne({ 'idN': idN }, (err, nekretnina) => {
                if (err)
                    console.log(err);
                else
                    res.json(nekretnina);
            });
        };
        this.odobriNekretninu = (req, res) => {
            let idN = req.body.idN;
            nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { 'odobrena': true } }, err => {
                if (err)
                    console.log(err);
            });
        };
        this.promovisiNekretninu = (req, res) => {
            let idN = req.body.idN;
            nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { 'promovisana': true } }, err => {
                if (err)
                    console.log(err);
            });
        };
        this.ukloniIzPromovisanih = (req, res) => {
            let idN = req.body.idN;
            nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { 'promovisana': false } }, err => {
                if (err)
                    console.log(err);
            });
        };
        this.dodajNekretninu = (req, res) => {
            nekretnina_1.default.find({}, (err, nekretnine) => {
                if (err)
                    console.log(err);
                else {
                    let nekretnina = new nekretnina_1.default(req.body);
                    if (nekretnine) {
                        nekretnina.set('idN', nekretnine.length + 1);
                    }
                    else {
                        nekretnina.set('idN', 1);
                    }
                    nekretnina.save().then((nekretnina) => {
                        res.status(200).json({ 'message': 'nekretnina dodata' });
                    }).catch((err) => {
                        res.status(400).json({ 'message': err });
                    });
                }
            });
        };
        this.pretraziNekretnine = (req, res) => {
            let naziv = req.body.naziv;
            let grad = req.body.grad;
            let cenaOd = req.body.cenaOd;
            let cenaDo = req.body.cenaDo;
            nekretnina_1.default.find({ 'naziv': { $regex: naziv }, 'grad': { $regex: grad }, 'cena': { $gt: cenaOd, $lt: cenaDo } }, (err, nekretnine) => {
                if (err)
                    console.log(err);
                else
                    res.json(nekretnine);
            });
        };
    }
}
exports.NekretninaController = NekretninaController;
//# sourceMappingURL=nekretnina.controller.js.map