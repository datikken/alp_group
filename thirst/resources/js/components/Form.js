import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {geodata_get, waterbases_get, regions_get, order_set} from '../store/storeSlice';
import { Formik } from 'formik';

import * as Yup from 'yup';

const ValidationSchema = Yup.object().shape({
    waterAmount: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    deliveryAddress: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required')
});

function Form() {
    const geo = useSelector(geodata_get);
    const waterbases = useSelector(waterbases_get);
    const regions = useSelector(regions_get);
    let order = {};

    const dispatch = useDispatch();

    useEffect(() => {
        order.office = regions ? regions.data.filter(obj => {
            if(obj.area_names.includes(geo)) {
                return waterbases.filter(base => base.uuid === obj.uuid)
            }
        }) : null;

    }, [geo,waterbases]);

    return (
        <div>
            <h2>Water, water, water!</h2>
            <Formik
                initialValues={{waterAmount: '', deliveryAddress: ''}}
                validationSchema={ValidationSchema}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    order.form = values;

                    dispatch(order_set(order));

                    setSubmitting(false);
                    resetForm();
                }}
            >
                {({
                      values,
                      errors,
                      handleChange,
                      handleSubmit,
                      touched,
                      isSubmitting,
                      /* and other goodies */
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1"
                                   className="form-label">{errors.waterAmount && touched.waterAmount && errors.waterAmount}</label>
                            <input
                                className="form-control"
                                type="number"
                                name="waterAmount"
                                onChange={handleChange}
                                value={values.waterAmount}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1"
                                   className="form-label">{errors.deliveryAddress && touched.deliveryAddress && errors.deliveryAddress}</label>
                            <input
                                type="text"
                                className="form-control"
                                name="deliveryAddress"
                                onChange={handleChange}
                                value={values.deliveryAddress}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Order</button>
                    </form>
                )}
            </Formik>
        </div>
    );
}

export default Form;
