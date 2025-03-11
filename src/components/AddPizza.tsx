import React from 'react';
import { useForm, Controller } from 'react-hook-form';

interface Pizza {
  id: number;
  name: string;
  toppings: string[];
  Favourite: string;
  delivery: string;
}

interface PizzaFormProps {
  setPizza: React.Dispatch<React.SetStateAction<Pizza[]>>; // Function to update pizza state
}

const PizzaForm: React.FC<PizzaFormProps> = ({ setPizza }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<Pizza>();

  // Handle form submission
  const onSubmit = (data: Pizza) => {
    const newPizza: Pizza = {
      id: Date.now(), // Use timestamp as a simple unique ID
      name: data.name,
      toppings: data.toppings.map((topping: string) => topping.trim()), // Split toppings by commas
      Favourite: data.Favourite,
      delivery: data.delivery,
    };

    // Update the pizza state with the new pizza
    setPizza((prevPizza) => [...prevPizza, newPizza]);

    // Clear form fields after submission
    reset();
  };

  return (
    <div>
      <h3>Add a New Pizza</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Pizza Name */}
        <label>
          Pizza Name:
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: 'Pizza name is required', maxLength: { value: 100, message: 'Name cannot be more than 100 characters' } }}
            render={({ field }) => <input {...field} />}
          />
        </label>
        {errors.name && <p>{errors.name.message}</p>}
        <br />

        {/* Toppings */}
        <label>
          Toppings (comma separated):
          <Controller
            name="toppings"
            control={control}
            defaultValue={[]}
            rules={{ required: 'Toppings are required' }}
            render={({ field }) => <input {...field} />}
          />
        </label>
        {errors.toppings && <p>{errors.toppings.message}</p>}
        <br />

        {/* Favourite */}
        <label>
          Favourite:
          <Controller
            name="Favourite"
            control={control}
            defaultValue={"No"}
            render={({ field }) => <input type="string" {...field} />}
          />
        </label>
        <br />

        {/* Delivery */}
        <label>
          Delivery:
          <Controller
            name="delivery"
            control={control}
            defaultValue={"No"}
            render={({ field }) => <input type="checkbox" {...field} />}
          />
        </label>
        <br />

        <button type="submit">Add Pizza</button>
      </form>
    </div>
  );
};

export default PizzaForm;
