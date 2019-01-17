"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/throw');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
var CountryPickerService = (function () {
    function CountryPickerService(config, http) {
        this.config = config;
        this.http = http;
        this.dataUrl = 'countries.json';
        this.data = null;
        this.baseUrl = './';
        this.baseUrl = config.baseUrl;
        this.data = this.loadData();
    }
    CountryPickerService.prototype.loadData = function () {
        return this.http.get(this.baseUrl + this.dataUrl)
            .map(function (res) { return res.json() || {}; })
            .catch(this.handleError);
    };
    CountryPickerService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            if (error.status === 404) {
                errMsg = 'Error loading countries.json file. Please configure WebPack and load countries.json assets to your root folder';
            }
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    CountryPickerService.prototype.getCountries = function () {
        return this.data.map(function (countries) { return countries.map(function (country) {
            country.name.native[0] = country.name.native[Object.keys(country.name.native)[0]];
            return country;
        }); });
    };
    CountryPickerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [Object, http_1.Http])
    ], CountryPickerService);
    return CountryPickerService;
}());
exports.CountryPickerService = CountryPickerService;
//# sourceMappingURL=country-picker.service.js.map