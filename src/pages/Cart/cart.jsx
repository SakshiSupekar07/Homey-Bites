import React from 'react'
import './cart.css'

const cart = () => {
  return (
    <div className='cart'>
      <div className='cart-container'>
        
        <div className='cart-items'>
            <table>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
                <tr>
                    <td>Item 1</td>
                    <td>1</td>
                    <td>100</td>
                    <td>100</td>
                </tr>
                <tr>
                    <td>Item 2</td>
                    <td>1</td>
                    <td>100</td>
                    <td>100</td>
                </tr>
                <tr>
                    <td>Item 3</td>
                    <td>1</td>
                    <td>100</td>
                    <td>100</td>    
                </tr>
            </table>
        </div>

        <div className='cart-checkout'>

        </div>
      </div>
    </div>
  )
}

export default cart;
