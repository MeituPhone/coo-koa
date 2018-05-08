//last modified plugin

module.exports = (schema, options) => {
    schema.add({
        meta: {
            createAt: {
                type: Date,
                defualt: Date.now()
            },
            updateAt: {
                type: Date,
                defualt: Date.now()
            }
        }
    });

    schema.pre('save', function (next) {
        if (this.isNew) {
            this.meta.createAt = this.meta.updateAt = Date.now()
        } else {
            this.updateAt = Date.now();
        }

        next();
    })
}