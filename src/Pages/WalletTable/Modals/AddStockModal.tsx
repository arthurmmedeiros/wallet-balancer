import {
  Button, Form, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader,
} from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import { addStock, closeAddModal } from '../../../Stores/Board/BoardSlice';
import { useAppDispatch, useAppSelector } from '../../../Stores/Hooks';
import { IAddStockForm } from '../Model/IAddStockForm';
import { IAddStock } from '../../../Stores/UserStocks/Types';

const AddStockModal = () => {
  const dispatch = useAppDispatch();

  const addModal = useAppSelector((state) => state.board.modal);

  const selectedStock = useAppSelector((state) => state.userStocks.stocks.find((s) => s.stock.tempId === state.board.modal.selectedStockId));

  const {
    register, handleSubmit, formState: { errors }, reset, getValues,
  } = useForm<IAddStockForm>({
    defaultValues: {
      amount: 0,
      idealPercentage: 0,
      code: '',
    },
  });

  useEffect(() => {
    reset({
      amount: selectedStock ? selectedStock.amount : 0,
      idealPercentage: selectedStock ? selectedStock.idealPercentage : 0,
      code: selectedStock ? selectedStock.stock.code : '',
    });
  }, [selectedStock]);

  const handleCloseModal = useCallback(() => {
    dispatch(closeAddModal());
    reset({});
  }, [reset]);

  const onSubmit = (handleSubmit((data) => {
    const addModal: IAddStock = {
      code: data.code,
      amount: data.amount,
      idealPercentage: data.idealPercentage,
    };
    dispatch(addStock(addModal));
    handleCloseModal();
  }));

  return (
    <Modal isOpen={addModal.isOpen} toggle={handleCloseModal} size="lg">
      <ModalHeader toggle={handleCloseModal}>
        Add/Edit a stock
      </ModalHeader>
      <ModalBody>
        <Form noValidate className="needs-validation">
          <FormGroup>
            <label htmlFor="code" className="form-label">Code</label>
            <input
              id="code"
              className={`form-control ${errors.code ? 'is-invalid' : ''}`}
              {...register('code', { required: true, minLength: 1 })}
            />
            <div className="invalid-feedback">Code is required</div>
          </FormGroup>
          <FormGroup>
            <label htmlFor="quantity" className="form-label">Quantity</label>
            <input
              type="number"
              id="quantity"
              className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
              {...register('amount', { required: true, minLength: 1 })}
            />
            <div className="invalid-feedback">Quantity is required</div>
          </FormGroup>
          <FormGroup>
            <label htmlFor="total-ideal" className="form-label">Total ideal</label>
            <input
              type="number"
              id="total-ideal"
              className={`form-control ${errors.idealPercentage ? 'is-invalid' : ''}`}
              {...register('idealPercentage', { required: true, minLength: 1 })}
            />
            <div className="invalid-feedback">Total ideal is required</div>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={() => { onSubmit(); }}
          color="primary"
        >
          Confirm
        </Button>
        <Button onClick={handleCloseModal} color="secondary">
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddStockModal;
