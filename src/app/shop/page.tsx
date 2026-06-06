"use client";

import { useEffect, useMemo, useState } from "react";
import PageShell from "@/components/PageShell";
import ProductThumb from "@/components/shop/ProductThumb";
import { useAgentProfile } from "@/components/AgentProfileProvider";
import {
  PRODUCTS,
  SHOP_CATEGORIES,
  COMPLIANCE_ITEMS,
  DEFAULT_CARDS,
  SAMPLE_ORDERS,
  type Product,
  type SavedCard,
  type ShopCategory,
  type ShopOrder,
} from "@/lib/mock/shop";

type CatFilter = "All" | ShopCategory;
type CartLine = { id: string; qty: number };

const CARDS_KEY = "mr-shop-cards";
const HOME_ADDRESS = "1820 Coast Vista Dr, Newport Beach, CA 92660";

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

// Marketing Shop. Order branded print, signage, apparel, and promo products.
// Branding and state/brokerage compliance are auto-applied. Cart, checkout,
// saved cards, and orders are all mock. Nothing is actually purchased.
export default function ShopPage() {
  const { profile } = useAgentProfile();
  const [cat, setCat] = useState<CatFilter>("All");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [shipTo, setShipTo] = useState<"home" | "office">("office");
  const [cards, setCards] = useState<SavedCard[]>(DEFAULT_CARDS);
  const [selectedCard, setSelectedCard] = useState<string>(DEFAULT_CARDS[0].id);
  const [orders, setOrders] = useState<ShopOrder[]>(SAMPLE_ORDERS);
  const [placed, setPlaced] = useState<ShopOrder | null>(null);

  // Load saved cards.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CARDS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as SavedCard[];
        if (parsed.length) {
          setCards(parsed);
          setSelectedCard(parsed[0].id);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const persistCards = (next: SavedCard[]) => {
    setCards(next);
    try {
      window.localStorage.setItem(CARDS_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const productById = (id: string) => PRODUCTS.find((p) => p.id === id);
  const shown =
    cat === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);

  const addToCart = (id: string, qty: number) => {
    setCart((prev) => {
      const existing = prev.find((l) => l.id === id);
      if (existing) {
        return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
      }
      return [...prev, { id, qty }];
    });
    setCartOpen(true);
  };

  const setQty = (id: string, qty: number) =>
    setCart((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty } : l))
    );

  const subtotal = useMemo(
    () =>
      cart.reduce((sum, l) => {
        const p = productById(l.id);
        return sum + (p ? p.price * l.qty : 0);
      }, 0),
    [cart]
  );
  const cartCount = cart.reduce((n, l) => n + l.qty, 0);

  const placeOrder = () => {
    const order: ShopOrder = {
      id: "MR-" + Math.floor(10000 + Math.random() * 89999),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      items:
        cart
          .map((l) => `${productById(l.id)?.name} x${l.qty}`)
          .slice(0, 2)
          .join(", ") + (cart.length > 2 ? ` +${cart.length - 2} more` : ""),
      total: subtotal,
      status: "Processing",
    };
    setOrders((prev) => [order, ...prev]);
    setPlaced(order);
    setCart([]);
    setCheckout(false);
    setCartOpen(false);
  };

  return (
    <PageShell
      active="/shop"
      eyebrow="Marketing"
      title="Marketing Shop"
      description="Order branded print, signage, apparel, and promo products. Your branding and state and brokerage compliance are applied automatically. Mock catalog; nothing is actually purchased."
    >
      {/* Compliance banner */}
      <div className="mb-6 rounded-2xl border border-mr-light/30 bg-mr-pale/15 p-5">
        <p className="font-heading text-sm font-bold text-mr-dark">
          Compliance auto-applied to every order
        </p>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
          {COMPLIANCE_ITEMS.map((c) => (
            <span key={c} className="flex items-center gap-1.5 text-xs text-body">
              <span aria-hidden className="text-mr-base">
                ✓
              </span>
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {(["All", ...SHOP_CATEGORIES] as CatFilter[]).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                cat === c
                  ? "bg-mr-base text-white shadow-sm"
                  : "border border-mr-base/15 bg-white/60 text-body hover:text-mr-base"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="relative rounded-full bg-mr-base px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-mr-mid"
        >
          Cart
          {cartCount > 0 ? (
            <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-xs font-bold text-mr-base">
              {cartCount}
            </span>
          ) : null}
        </button>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={addToCart} />
        ))}
      </div>

      {/* Recent orders + payment methods */}
      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/50 bg-white/60 p-6 shadow-sm backdrop-blur-xl backdrop-saturate-150">
          <h2 className="mb-4 font-heading text-lg font-bold text-mr-dark">
            Recent orders
          </h2>
          <div className="flex flex-col gap-2">
            {orders.map((o) => (
              <div
                key={o.id}
                className="flex items-center justify-between rounded-xl border border-white/60 bg-white/60 p-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-mr-dark">{o.id}</p>
                  <p className="truncate text-xs text-body">{o.items}</p>
                  <p className="text-xs text-mr-pale">{o.date}</p>
                </div>
                <div className="flex flex-none items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-mr-dark">
                      {money(o.total)}
                    </p>
                    <span className="rounded-full bg-mr-pale/25 px-2 py-0.5 text-xs font-medium text-mr-base">
                      {o.status}
                    </span>
                  </div>
                  {/* Mock reorder: clones the order as a new Processing order */}
                  <button
                    type="button"
                    onClick={() =>
                      setOrders((prev) => [
                        {
                          ...o,
                          id: "MR-" + String(Date.now()).slice(-6),
                          date: new Date().toLocaleDateString("en-US", {
                            month: "short",
                            day: "2-digit",
                          }),
                          status: "Processing",
                        },
                        ...prev,
                      ])
                    }
                    className="rounded-full border border-mr-base/20 bg-white/70 px-3 py-1.5 text-xs font-semibold text-mr-base transition-colors hover:bg-white"
                  >
                    Reorder
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <PaymentMethods cards={cards} onChange={persistCards} />
      </div>

      {/* Cart drawer */}
      {cartOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setCartOpen(false)}
          className="fixed inset-0 z-50 flex justify-end bg-mr-dark/30 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-full max-w-md flex-col border-l border-white/70 bg-white/90 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between border-b border-mr-base/10 p-5">
              <h2 className="font-heading text-lg font-bold text-mr-dark">
                Your cart
              </h2>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-mr-base/15 text-mr-base hover:bg-white"
              >
                &times;
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <p className="py-12 text-center text-sm text-body">
                  Your cart is empty.
                </p>
              ) : (
                <div className="flex flex-col gap-3">
                  {cart.map((l) => {
                    const p = productById(l.id);
                    if (!p) return null;
                    return (
                      <div
                        key={l.id}
                        className="flex items-center gap-3 rounded-xl border border-white/60 bg-white/70 p-3"
                      >
                        <div className="h-14 w-14 flex-none overflow-hidden rounded-lg">
                          <ProductThumb kind={p.kind} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-mr-dark">
                            {p.name}
                          </p>
                          <p className="text-xs text-body">
                            {money(p.price)} {p.unit}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setQty(l.id, l.qty - 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-mr-base/15 text-mr-base"
                          >
                            –
                          </button>
                          <span className="w-6 text-center text-sm">{l.qty}</span>
                          <button
                            type="button"
                            onClick={() => setQty(l.id, l.qty + 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-mr-base/15 text-mr-base"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="border-t border-mr-base/10 p-5">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-body">Subtotal</span>
                <span className="font-heading text-lg font-bold text-mr-dark">
                  {money(subtotal)}
                </span>
              </div>
              <p className="mb-3 text-xs text-body">
                Free production proof and shipping to your address on file.
              </p>
              <button
                type="button"
                disabled={cart.length === 0}
                onClick={() => setCheckout(true)}
                className="w-full rounded-full bg-mr-base px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-mr-mid disabled:opacity-40"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Checkout modal */}
      {checkout ? (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setCheckout(false)}
          className="fixed inset-0 z-[55] flex items-center justify-center bg-mr-dark/40 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/70 bg-white p-7 shadow-2xl"
          >
            <h2 className="font-heading text-2xl font-bold text-mr-dark">
              Checkout
            </h2>
            <p className="mt-1 text-sm text-body">
              {cartCount} item{cartCount === 1 ? "" : "s"} · {money(subtotal)}
            </p>

            {/* Ship to */}
            <p className="mt-5 mb-2 text-xs font-semibold uppercase tracking-wide text-mr-base">
              Ship to
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <ShipOption
                label="Office"
                address={profile.address}
                active={shipTo === "office"}
                onClick={() => setShipTo("office")}
              />
              <ShipOption
                label="Home"
                address={HOME_ADDRESS}
                active={shipTo === "home"}
                onClick={() => setShipTo("home")}
              />
            </div>

            {/* Payment */}
            <p className="mt-5 mb-2 text-xs font-semibold uppercase tracking-wide text-mr-base">
              Payment
            </p>
            <div className="flex flex-col gap-2">
              {cards.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCard(c.id)}
                  className={`flex items-center justify-between rounded-xl border p-3 text-left ${
                    selectedCard === c.id
                      ? "border-mr-light/60 bg-mr-pale/20"
                      : "border-white/60 bg-white/60"
                  }`}
                >
                  <span className="text-sm font-medium text-mr-dark">
                    {c.brand} ending {c.last4}
                  </span>
                  <span className="text-xs text-body">Exp {c.exp}</span>
                </button>
              ))}
            </div>

            {/* Compliance */}
            <div className="mt-5 rounded-xl border border-mr-light/30 bg-mr-pale/10 p-4">
              <p className="text-xs font-semibold text-mr-base">
                Auto-applied to this order
              </p>
              <div className="mt-2 flex flex-col gap-1">
                {COMPLIANCE_ITEMS.map((c) => (
                  <span key={c} className="flex items-center gap-2 text-xs text-body">
                    <span aria-hidden className="text-mr-base">✓</span>
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={() => setCheckout(false)}
                className="flex-1 rounded-full border border-mr-base/20 bg-white/70 px-5 py-2.5 text-sm font-semibold text-mr-base hover:bg-white"
              >
                Back
              </button>
              <button
                type="button"
                onClick={placeOrder}
                className="flex-1 rounded-full bg-mr-base px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-mr-mid"
              >
                Place order {money(subtotal)}
              </button>
            </div>
            <p className="mt-3 text-center text-xs text-body">
              Mock checkout. No payment is processed and nothing ships.
            </p>
          </div>
        </div>
      ) : null}

      {/* Order success */}
      {placed ? (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setPlaced(null)}
          className="fixed inset-0 z-[55] flex items-center justify-center bg-mr-dark/40 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl border border-white/70 bg-white p-8 text-center shadow-2xl"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-mr-base text-2xl font-bold text-white">
              ✓
            </div>
            <h2 className="mt-4 font-heading text-2xl font-bold text-mr-dark">
              Order placed
            </h2>
            <p className="mt-1 text-sm text-body">
              Order {placed.id} for {money(placed.total)} is in production.
              Shipping to your {shipTo} address.
            </p>
            <p className="mt-1 text-xs text-body">
              Placeholder confirmation. Nothing was actually ordered.
            </p>
            <button
              type="button"
              onClick={() => setPlaced(null)}
              className="mt-5 rounded-full bg-mr-base px-6 py-2.5 text-sm font-semibold text-white hover:bg-mr-mid"
            >
              Done
            </button>
          </div>
        </div>
      ) : null}
    </PageShell>
  );
}

function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (id: string, qty: number) => void;
}) {
  const [qty, setQty] = useState(1);
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/70 shadow-sm backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="h-44">
        <ProductThumb kind={product.kind} />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-base font-bold text-mr-dark">
            {product.name}
          </h3>
          <span className="flex-none text-right">
            <span className="block font-heading text-base font-bold text-mr-base">
              {money(product.price)}
            </span>
            <span className="block text-xs text-body">{product.unit}</span>
          </span>
        </div>
        <p className="mt-1 flex-1 text-sm text-body">{product.blurb}</p>
        <div className="mt-4 flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full border border-mr-base/15 px-2 py-1">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex h-6 w-6 items-center justify-center rounded-full text-mr-base"
            >
              –
            </button>
            <span className="w-5 text-center text-sm">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => q + 1)}
              className="flex h-6 w-6 items-center justify-center rounded-full text-mr-base"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={() => onAdd(product.id, qty)}
            className="flex-1 rounded-full bg-mr-base px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-mr-mid"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

function ShipOption({
  label,
  address,
  active,
  onClick,
}: {
  label: string;
  address: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border p-3 text-left ${
        active ? "border-mr-light/60 bg-mr-pale/20" : "border-white/60 bg-white/60"
      }`}
    >
      <span className="block text-sm font-semibold text-mr-dark">{label}</span>
      <span className="block text-xs text-body">{address}</span>
    </button>
  );
}

function PaymentMethods({
  cards,
  onChange,
}: {
  cards: SavedCard[];
  onChange: (next: SavedCard[]) => void;
}) {
  const [adding, setAdding] = useState(false);
  const [number, setNumber] = useState("");
  const [exp, setExp] = useState("");

  const addCard = () => {
    const digits = number.replace(/\D/g, "");
    const last4 = digits.slice(-4) || "0000";
    const brand =
      digits[0] === "4" ? "Visa" : digits[0] === "5" ? "Mastercard" : "Card";
    const next: SavedCard = {
      id: "card" + Date.now(),
      brand,
      last4,
      exp: exp || "01/30",
    };
    onChange([...cards, next]);
    setNumber("");
    setExp("");
    setAdding(false);
  };

  return (
    <section className="rounded-2xl border border-white/50 bg-white/60 p-6 shadow-sm backdrop-blur-xl backdrop-saturate-150">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-heading text-lg font-bold text-mr-dark">
          Payment methods
        </h2>
        <button
          type="button"
          onClick={() => setAdding((v) => !v)}
          className="rounded-full border border-mr-base/20 bg-white/70 px-3 py-1.5 text-xs font-semibold text-mr-base hover:bg-white"
        >
          {adding ? "Cancel" : "Add card"}
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {cards.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between rounded-xl border border-white/60 bg-white/60 p-3"
          >
            <span className="text-sm font-medium text-mr-dark">
              {c.brand} ending {c.last4}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-xs text-body">Exp {c.exp}</span>
              <button
                type="button"
                onClick={() => onChange(cards.filter((x) => x.id !== c.id))}
                className="text-xs font-medium text-mr-base hover:text-mr-mid"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {adding ? (
        <div className="mt-3 rounded-xl border border-mr-base/15 bg-white/70 p-4">
          <p className="mb-2 text-xs font-medium text-mr-base">
            Demo only. Do not enter a real card number.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              inputMode="numeric"
              placeholder="Card number"
              className="flex-1 rounded-xl border border-mr-base/15 bg-white px-3 py-2.5 text-sm text-mr-dark outline-none focus:border-mr-light focus:ring-2 focus:ring-mr-light/40"
            />
            <input
              value={exp}
              onChange={(e) => setExp(e.target.value)}
              placeholder="MM/YY"
              className="w-full rounded-xl border border-mr-base/15 bg-white px-3 py-2.5 text-sm text-mr-dark outline-none focus:border-mr-light focus:ring-2 focus:ring-mr-light/40 sm:w-28"
            />
            <button
              type="button"
              onClick={addCard}
              className="rounded-full bg-mr-base px-5 py-2.5 text-sm font-semibold text-white hover:bg-mr-mid"
            >
              Save
            </button>
          </div>
          <p className="mt-2 text-xs text-body">
            Only a masked label (brand and last 4) is saved for this demo.
          </p>
        </div>
      ) : null}
    </section>
  );
}
