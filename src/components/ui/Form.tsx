import { useState } from "react";
import { input } from "../styles/input";
import { typograph } from "../styles/typograph";
import { INITIAL_ORDER } from "../../constants/order";
import type { ShippingRequest } from "../../types/shipping";
import { useShippingCalculate } from "../../hooks/useShippingCalculate";
import type { OrderState } from "../../types/order";

export default function Form() {
  const [order, setOrder] = useState<OrderState>(INITIAL_ORDER);
  const { mutate, isPending } = useShippingCalculate();

  async function updateOrder(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    // const formData = new FormData(e.currentTarget);
    // const street = formData.get("street") as string;
    // const city = formData.get("city") as string;
    // const state = formData.get("state") as string;
    // const postalCode = formData.get("postal") as string;

    const {
      street,
      city,
      state,
      postal: postalCode,
    } = Object.fromEntries(new FormData(e.currentTarget)) as any;

    if (!postalCode) return;

    const payload: ShippingRequest = {
      from: { postal_code: "01310100" },
      to: { postal_code: postalCode },
      products: [
        {
          id: 1,
          width: 11,
          height: 17,
          length: 11,
          weight: 0.3,
          insurance_value: 10,
          quantity: 1,
        },
      ],
      options: {
        receipt: false,
        own_hand: false,
        insurance_value: 0,
        reverse: false,
        non_commercial: false,
      },
    };

    mutate(payload, {
      onSuccess: (result) => {
        const cheapest = result
          .filter((q) => !q.error)
          .sort((a, b) => Number(a.price) - Number(b.price))[0];
        if (cheapest) {
          setOrder((prev) => ({
            ...prev,
            selectedShippingId: cheapest.id,
          }));
        }
      },
    });
    setOrder((prevOrder) => ({
      ...prevOrder,
      items: [{ label: "Camiseta", value: 20 }],
      address: {
        street,
        city,
        state,
        postal: postalCode,
      },
    }));
    console.log(order);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <label className={typograph({})}>Country</label>
        <select
          name="country"
          className="bg-background-card min-w-30 border border-border px-2 py-2 outline-none"
        >
          <option value="Brazil" selected>
            Brazil
          </option>
          <option value="United State">United State</option>
          <option value="United Kingdom">United Kingdom</option>
        </select>
      </div>
      <form
        onSubmit={updateOrder}
        className="w-full bg-background-card border border-border p-4 flex flex-col gap-4"
      >
        <label htmlFor="street" hidden>
          Street
        </label>
        <input
          name="street"
          type="text"
          placeholder="Street"
          className={input()}
        />
        <div className="flex gap-4">
          <label htmlFor="City" hidden>
            Street
          </label>
          <input
            name="city"
            type="text"
            placeholder="City"
            className={input()}
          />
          <label htmlFor="State" hidden>
            Street
          </label>
          <input
            name="state"
            type="text"
            placeholder="State / Region"
            className={input()}
          />
        </div>
        <label htmlFor="postal" hidden>
          Street
        </label>
        <input
          name="postal"
          type="text"
          placeholder="Postal / ZIP"
          className={input()}
        />
        <button
          id="sendOrder"
          type="submit"
          className="bg-foreground text-background font-extrabold px-4 py-2 cursor-pointer"
        >
          Place order
        </button>
      </form>

      <div className="flex flex-col gap-2">
        <h2 className={typograph({ color: "detail" })}>Order summary</h2>

        <div className="w-full bg-background-card border border-border p-4 flex flex-col">
          <span className={typograph({})}>
            Items:
            {order.items.length > 0
              ? order.items.map((i) => `${i.label} - R$ ${i.value}`)
              : " -"}
          </span>
          <span className={typograph({})}>
            Subtotal:
            {order.items.length > 0
              ? ` R$ ${order.items.reduce((acc, item) => acc + item.value, 0)}`
              : " R$ 0"}
          </span>
          <span className={typograph({})}>
            Shipping Address:
            {order.address
              ? ` ${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.postal} `
              : " -"}
          </span>
          <span className={typograph({})}>
            Tax: {isPending && <span> Calculando</span>}
          </span>
        </div>
      </div>
    </div>
  );
}
