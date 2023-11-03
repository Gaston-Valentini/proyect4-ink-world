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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appoitments = void 0;
const typeorm_1 = require("typeorm");
const Client_1 = require("./Client");
const TattooArtist_1 = require("./TattooArtist");
let Appoitments = class Appoitments extends typeorm_1.BaseEntity {
};
exports.Appoitments = Appoitments;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Appoitments.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Appoitments.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Appoitments.prototype, "tattooArtistId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Appoitments.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Appoitments.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Appoitments.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Appoitments.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Client_1.Client, (client) => client.appoitments),
    (0, typeorm_1.JoinColumn)({ name: "clientId" }),
    __metadata("design:type", Client_1.Client)
], Appoitments.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TattooArtist_1.TattooArtist, (tattooArtist) => tattooArtist.appoitments),
    (0, typeorm_1.JoinColumn)({ name: "tattooArtistId" }),
    __metadata("design:type", TattooArtist_1.TattooArtist)
], Appoitments.prototype, "tattooArtist", void 0);
exports.Appoitments = Appoitments = __decorate([
    (0, typeorm_1.Entity)("appoitments")
], Appoitments);
