"use strict";

// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.
/** Reasons for an inferior terminating. */
(function (InferiorExitReason) {
    /** An inferior finished executing and terminated normally. */
    InferiorExitReason[InferiorExitReason["Finished"] = 0] = "Finished";
    /** An inferior terminated because it received a signal. */
    InferiorExitReason[InferiorExitReason["Signalled"] = 1] = "Signalled";
    /** An inferior terminated (for some reason). */
    InferiorExitReason[InferiorExitReason["Other"] = 2] = "Other";
})(exports.InferiorExitReason || (exports.InferiorExitReason = {}));
var InferiorExitReason = exports.InferiorExitReason;