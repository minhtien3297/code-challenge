``` typescriptreact
// missing blockchain, id type
interface WalletBalance {
    id: string;
    currency: string;
    amount: number;
}

// should extend the WalletBalance because have 2 properties same
interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
}

// need to add actual properties
interface Props extends BoxProps {

}

// already have Props type declare
const WalletPage: React.FC<Props> = (props: Props) => {
    // destructure exactly what should be used in the component   
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();

    // blockchain should be type string, avoid any
    // each case should be managed using enum or constant
    const getPriority = (blockchain: any): number => {
        switch (blockchain) {
            case 'Osmosis':
                return 100
            case 'Ethereum':
                return 50
            case 'Arbitrum':
                return 30
            case 'Zilliqa':
                return 20
            case 'Neo':
                return 20
            default:
                return -99
        }
    }

    const sortedBalances = useMemo(() => {
        return balances.filter((balance: WalletBalance) => {
            const balancePriority = getPriority(balance.blockchain);

            // should not use magic numbers, manage with constants or enums
            // remove the nested if statements and return the true directly
            // rename the variable
            if (lhsPriority > -99) {
                if (balance.amount <= 0) {
                    return true;
                }
            }

            return false
            // create value to store the filter result then sort instead of on chain
            // create more meaning full variable names
        }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
                // rename the variable
                const leftPriority = getPriority(lhs.blockchain);
                const rightPriority = getPriority(rhs.blockchain);

                // return the comparison directly
                if (leftPriority > rightPriority) {
                    return -1;
                } else if (rightPriority > leftPriority) {
                    return 1;
                }
            });
            //watch only the property we need to use
    }, [balances, prices]);

    // should return the formatted balances from the useMemo above 
    const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
        return {
            ...balance,
            formatted: balance.amount.toFixed()
        }
    })

    // should use useMemo on this one to cache the rows
    // wrong balances array used => should use formattedBalances
    const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
        // need check for NaN
        const usdValue = prices[balance.currency] * balance.amount;
        return (
            <WalletRow 
                className={classes.row}
                // should not use index, change to something unique like id,...
                key={index}
                amount={balance.amount}
                usdValue={usdValue}
                formattedAmount={balance.formatted}
            />
        )
    })

    return (
        <div {...rest}>
            // have condition checking if rows is empty
            {rows}
        </div>
    )
}

```
