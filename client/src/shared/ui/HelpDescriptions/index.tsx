import React from 'react'

import { AddPost } from './AddPost'
import { AddReview } from './AddReview'
import { Contacts } from './Contacts'
import { DeleteReview } from './DeleteReview'
import { EditPost } from './EditPost'
import { FilterByCategory } from './FilterByCategory'
import { FilterBySearch } from './FilterBySearch'
import { Locations } from './Locations'
import { ForgotPassword } from './ForgotPassword'
import { Registration } from './Registration'
import { RememberPassword } from './RememberPassword'
import { UserInfo } from './UserInfo'

interface IProps {
  widget: string
}
const HelpDescriptions: React.FC<IProps> = React.memo(({ widget }) => {
  const widgetComponents = {
    Registration: <Registration />,
    UserInfo: <UserInfo />,
    RememberPassword: <RememberPassword />,
    ForgotPassword: <ForgotPassword />,
    AddPost: <AddPost />,
    EditPost: <EditPost />,
    AddReview: <AddReview />,
    DeleteReview: <DeleteReview />,
    Contacts: <Contacts />,
    FilterByCategory: <FilterByCategory />,
    FilterBySearch: <FilterBySearch />,
    Locations: <Locations />,
  }

  return <>{widgetComponents[widget]}</>
})

export { HelpDescriptions }
