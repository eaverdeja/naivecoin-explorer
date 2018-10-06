import * as block from './block'
import * as transaction from './transaction'
import * as wallet from './wallet'
import * as operator from './operator'

export default { ...block, ...transaction, ...wallet, ...operator }
