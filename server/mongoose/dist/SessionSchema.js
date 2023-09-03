"use strict";
exports.__esModule = true;
exports.SessionModel = void 0;
var mongoose_1 = require("mongoose");
var SessionSchema = new mongoose_1.Schema({
    id: { type: String },
    userName: { type: String },
    createdDate: { type: Number },
    isActive: { type: Boolean }
});
exports.SessionModel = mongoose_1.model("SessionModel", SessionSchema);
