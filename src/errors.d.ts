// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

// TypeScript makes it difficult to subclass Error properly since it insists on calling super()
// in the subclass constructor, so instead the error subclasses are declared here but
// implemented in plain JavaScript.

export class ConnectionError extends Error {
}
