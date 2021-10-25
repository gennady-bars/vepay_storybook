import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AccountCreation from '../../pages/Accounts/AccountCreation/AccountCreation'
import AccountDetails from '../../pages/Accounts/AccountDetails/AccountDetails'
import Accounts from '../../pages/Accounts/Accounts.tsx'
import AccountsUpdate from '../../pages/Accounts/AccountsUpdate/AccountsUpdate'
import AcquirerAddition from '../../pages/Acquirers/AcquirerAddition/AcquirerAddition'
import Acquirers from '../../pages/Acquirers/Acquirers'
import AcquirersDetails from '../../pages/Acquirers/AcquirersDetails/AcquirersDetails'
import AcquirersUpdate from '../../pages/Acquirers/AcquirersUpdate/AcquirersUpdate'
import HomePage from '../../pages/HomePage/HomePage'
import News from '../../pages/News/News'
import NewsCreation from '../../pages/News/NewsCreation/NewsCreation'
import NewsDetails from '../../pages/News/NewsDetails/NewsDetails'
import PartnerAcquierers from '../../pages/PartnerAcquierers/PartnerAcquierers'
import PartnerAcquierersAddition from '../../pages/PartnerAcquierers/PartnerAcquierersAddition/PartnerAcquierersAddition'
import PartnerAcquierersDetails from '../../pages/PartnerAcquierers/PartnerAcquierersDetails/PartnerAcquierersDetails'
import PartnerAcquierersUpdate from '../../pages/PartnerAcquierers/PartnerAcquierersUpdate/PartnerAcquierersUpdate'
import PartnerAddition from '../../pages/Partners/PartnerAddition/PartnerAddition'
import PartnerDetails from '../../pages/Partners/PartnerDetails/PartnerDetails'
import Partners from '../../pages/Partners/Partners'
import PartnerUpdate from '../../pages/Partners/PartnerUpdate/PartnerUpdate'
import RoleAddition from '../../pages/Roles/RoleAddition/RoleAddition'
import RoleDetails from '../../pages/Roles/RoleDetails/RoleDetails'
import Roles from '../../pages/Roles/Roles'
import RoleUpdate from '../../pages/Roles/RoleUpdate/RoleUpdate'
import ShopDetails from '../../pages/Shops/ShopDetails/ShopDetails'
import Shops from '../../pages/Shops/Shops'
import ShopsAddition from '../../pages/Shops/ShopsAddition/ShopsAddition'
import ShopUpdate from '../../pages/Shops/ShopUpdate/ShopUpdate'
import TerminalDetails from '../../pages/Terminals/TerminalDetails/TerminalDetails'
import Terminals from '../../pages/Terminals/Terminals'
import TerminalsAddition from '../../pages/Terminals/TerminalsAddition/TerminalsAddition'
import TerminalUpdate from '../../pages/Terminals/TerminalUpdate/TerminalUpdate'
import Transactions from '../../pages/Transactions/Transactions'

import styles from './Main.module.scss'

const Main = (props) => {

    return (
        <div className={styles.Main}>
            <Switch>
                <Route path='/' exact component={HomePage} />
                <Route path='/accounts' exact component={Accounts} />
                <Route path='/accounts/:id' exact component={AccountDetails} />
                <Route path='/accounts/:id/update' exact component={AccountsUpdate} />
                <Route path='/create-account' component={AccountCreation} />
                <Route path='/roles' exact component={Roles} />
                <Route path='/roles/:id' exact component={RoleDetails} />
                <Route path='/roles/:id/update' exact component={RoleUpdate} />
                <Route path='/add-role' exact component={RoleAddition} />
                <Route path='/news' exact component={News} />
                <Route path='/news/:id' component={NewsDetails} />
                <Route path='/create-news' component={NewsCreation} />
                <Route path='/acquirers' exact component={Acquirers} />
                <Route path='/acquirers/:id' exact component={AcquirersDetails} />
                <Route path='/acquirers/update/:id' exact component={AcquirersUpdate} />
                <Route path='/add-acquirer' component={AcquirerAddition} />
                <Route path='/partners' exact component={Partners} />
                <Route path='/partners/:id' exact component={PartnerDetails} />
                <Route path='/partners/update/:id' exact component={PartnerUpdate} />
                <Route path='/add-partner' component={PartnerAddition} />
                <Route path='/partners-acquirers/:partnerId' exact component={PartnerAcquierers} />
                <Route path='/partners-acquirers/:partnerId/:id' exact component={PartnerAcquierersDetails} />
                <Route path='/partners-acquirers/:partnerId/:id/update' exact component={PartnerAcquierersUpdate} />
                <Route path='/add-partner-acquirer/:partnerId' component={PartnerAcquierersAddition} />
                <Route path='/shops' exact component={Shops} />
                <Route path='/shops/:id' exact component={ShopDetails} />
                <Route path='/shops/update/:id' exact component={ShopUpdate} />
                <Route path='/add-shop/:partnerId' component={ShopsAddition} />
                <Route path='/terminals' exact component={Terminals} />
                <Route path='/terminals/:id' exact component={TerminalDetails} />
                <Route path='/terminals/update/:id' exact component={TerminalUpdate} />
                <Route path='/add-terminal/:shopId' exact component={TerminalsAddition} />
                <Route path='/transactions' exact component={Transactions} />
            </Switch>
        </div>
    )
}

export default Main