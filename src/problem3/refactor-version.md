``` typescriptreact

interface WalletBalance {
    blockchain: string;
    currency: string;
    amount: number;
}

interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
}

interface Props {
    className?: string,
    // the rest props
}

enum Blockchain {
    Osmosis  = 100,
    Ethereum = 50,
    Arbitrum = 30,
    Zilliqa  = 20,
    Neo      = 20,
}

const DEFAULT_PRIORITY = -99
const EMPTY_AMOUNT = 0

const WalletPage: React.FC<Props> = ({ className, ...rest }) => {
    const balances = useWalletBalances();
    const prices = usePrices();

    const getPriority = (blockchain: string): number => {
        switch (blockchain) {
            case Blockchain[Blockchain.Osmosis]:   return Blockchain.Osmosis;
            case Blockchain[Blockchain.Ethereum]:  return Blockchain.Ethereum;
            case Blockchain[Blockchain.Arbitrum]:  return Blockchain.Arbitrum;
            case Blockchain[Blockchain.Zilliqa]:   return Blockchain.Zilliqa;
            case Blockchain[Blockchain.Neo]:       return Blockchain.Neo;
            default:
                return DEFAULT_PRIORITY;
        }
    };

    const formattedWalletBalances = useMemo(() => {
        const filteredBalances = balances.filter((balance: WalletBalance) => {
            const balancePriority = getPriority(balance.blockchain);

            return balancePriority > DEFAULT_PRIORITY && balance.amount <= EMPTY_AMOUNT
        })

        const sortedBalances = filteredBalances.sort((leftBalance: WalletBalance,rightBalance: WalletBalance) => {
            const leftPriority = getPriority(leftBalance.blockchain);
            const rightPriority = getPriority(rightBalance.blockchain);

            return rightPriority - leftPriority
        });

        const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
            return {
                ...balance,
                formatted: balance.amount.toFixed()
            }
        })

        return formattedBalances
    }, [balances]);

    const rows = useMemo(() => {
        const rowComponents = formattedWalletBalances.map((balance: FormattedWalletBalance) => {
            const usdValue = (prices[balance.currency] * balance.amount) ?? DEFAULT_PRIORITY;

            return (
                <WalletRow 
                    className={classes.row}
                    key={balance.id}
                    amount={balance.amount}
                    usdValue={usdValue}
                    formattedAmount={balance.formatted}
                />
            )
        })
    }, [formattedWalletBalances, prices]);

    return (
        <div className={className} {...rest}>
            {rows}
        </div>
    )
}

```
