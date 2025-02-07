export default {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
      {
        name: 'user_name',
        title: 'User Name',
        type: 'string',
      },
      {
        name: 'user_phone',
        title: 'User Phone',
        type: 'string',
      },
      {
        name: 'user_email',
        title: 'User Email',
        type: 'string',
      },
      {
        name: 'user_address',
        title: 'User Address',
        type: 'text',
      },
      {
        name: 'status',
        title: 'Status',
        type: 'string',
        options: {
          list: [
            { title: 'Pending', value: 'pending' },
            { title: 'Dispatch', value: 'dispatch' },
            { title: 'Completed', value: 'success' },
          ],
        },
        initialValue: 'pending'
       
      },
    ],
  };