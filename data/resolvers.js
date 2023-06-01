import { Widgets } from './dbConnectors';
import { reject } from 'lodash';


export const resolvers = {
    // Gets the data from the mongoDb connector.
    getProduct: ({ id }) => {
        return Widgets.findById(id).exec()
            .then((product) => {
                return product;
            })
            .catch((err) => {
                throw err;
            });
    },
    createProduct: ({ input }) => {
        const newWidget = new Widgets({
            name: input.name,
            description: input.description,
            price: input.price,
            soldout: input.soldout,
            inventory: input.inventory,
            stores: input.stores
        });

        newWidget.id = newWidget._id;

        return newWidget.save()
            .then((savedWidget) => {
                return savedWidget;
            })
            .catch((err) => {
                throw err;
            });
    },
    updateProduct: ({ input }) => {
        return Widgets.findByIdAndUpdate({_id: input.id}, input, { new: true }).exec()
            .then((updatedWidget) => {
                return updatedWidget;
            })
            .catch((err) => {
                throw err;
            });
    },
    deleteProduct: ({ id }) => {
        return Widgets.findByIdAndRemove(id).exec()
            .then((removedProduct) => {
                if (removedProduct) {
                    return 'Product successfully removed.';
                } else {
                    return 'Product not found.';
                }
            })
            .catch((err) => {
                throw err;
            });
    }

}

export default resolvers;