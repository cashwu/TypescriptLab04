# Lab 04

## 練習步驟

1. 建立折扣介面

    ``` typescript
    interface IDiscounter {
        GetDiscount(price: number, qty: number, level: string);
    }
    ```

1. 實做折扣 Class

    ``` typescript
    class QtyDiscounter implements IDiscounter {
        GetDiscount(price: number, qty: number, level: string) {
            if (qty > 4) {
                return 0.8;
            }
            else if (qty > 2) {
                return 0.9;
            }
            else {
                return 1;
            }
        }
    }

    class PriceDiscounter implements IDiscounter {
        GetDiscount(price: number, qty: number, level: string) {
            if (price * qty > 500) {
                return 0.9;
            }
            else {
                return 1;
            }
        }
    }

    class MemberDiscounter implements IDiscounter {
        GetDiscount(price: number, qty: number, level: string) {
            if (level === 'VIP') {
                return 0.9;
            }
            else {
                return 1;
            }
        }
    }
    ```

1. 實做計算機 Class

    ``` typescript
    class Calculator {
        constructor(private discounterList: IDiscounter[]) {
        }

        Calculate(price: number, qty: number, level: string) {
            let totalPrice = price * qty;

            for (let discounter of this.discounterList) {
                var discount = discounter.GetDiscount(price, qty, level);

                totalPrice = totalPrice * discount;
            }

            return totalPrice;
        }
    }
    ```
    
1. 測試計算邏輯

    ``` typescript
    let discounterList: IDiscounter[] = [new QtyDiscounter(), new       PriceDiscounter(), new MemberDiscounter()];
    let calculator = new Calculator(discounterList);

    calculator.Calculate(300, 2, "Normal");
    calculator.Calculate(100, 4, "VIP");    
    ```


