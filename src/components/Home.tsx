import React from 'react';
import './styles.css';
import {Link} from 'react-router-dom';
import {useTable,Column,Row} from 'react-table';

interface Pizza {
    id: number;
    name: string;
    toppings: string[];
    Favourite: string;
    delivery: string;
  }

interface PizzaDataProps {
    pizzas: Pizza[];
  }

  /*const PizzaData: React.FC<PizzaDataProps> = ({ pizzas }) => {
    return(
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Pizza Name</th>
                        <th> Toppings</th>
                        <th>Favorite</th>
                        <th>Delivery</th>
                    </tr>
                </thead>
                <tbody>
                    {pizzas.map((pizza) => 
                        <tr key = {pizza.id}>
                            <td>{pizza.id}</td>
                            <td>{pizza.name}</td>
                            <td>{pizza.toppings}</td>
                            <td>{pizza.Favourite ? 'Yes':'No'}</td>
                            <td>{pizza.delivery? 'Yes':'No'}</td>

                        </tr>
                    )}
                </tbody>
            </table>
            <BackButton />
        </div>
    );
};*/


const PizzaDataReact: React.FC<PizzaDataProps> = ({ pizzas }) => {

    const data = React.useMemo(() => pizzas, [pizzas])

    const columns: Column<Pizza>[] =  React.useMemo(

        () => [
        {
            Header:"Edit",accessor:"id",
            Cell: ({ row }: { row: Row<Pizza> }) => (
                <Link to={`/edit/${row.original.id}`}>Edit</Link>
              ), 
        },
        {
            Header:"Name",accessor:"name"
        },
        {
            Header:"Toppings",accessor:"toppings",
            Cell: ({ value }: { value: string[] }) => value.join(', '),
        },
        {
            Header:"Favourite",accessor:"Favourite",
            Cell: ({ value }: { value: string }) => (value ? 'Yes' : 'No'),
        },
        {
            Header:"Delivery",accessor:"delivery",
            Cell: ({ value }: { value: string }) => (value ? 'Yes' : 'No'),
        }
    ],
    []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
      });

      return (
        <div className="table-container">
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <BackButton />  
        
        </div>
      );
};

















const BackButton = () => {

    return (
        <Link to="/"> <button className="button" id="backButton">Go to Home</button></Link>
    );

};

export default PizzaDataReact;