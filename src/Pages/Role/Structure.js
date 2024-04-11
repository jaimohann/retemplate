export const search = {
  columns: [
    {
      name: "id",
      hidden: true,
    },
    {
      name: "title",
      displayName: "Title",
      width: "250px",
    },
    {
      name: "description",
      displayName: "Body",
      type: "numeric",
      width: "250px",
    },
    {
      name: "web_url",
      displayName: "URL",
      search: false,
      width: "250px",
    },
    {
      name: "created_at",
      displayName: "Created At",
      linkedTo: "dob",
      width: "250px",
    },
    {
      name: "node_id",
      hidden: true,
    },
  ],
  serialNo: {
    name: "serial_no",
    title: "#",
    required: true,
    width: "40px",
    align: "center",
  },
  paginated: true,
  initialSort: { name: "created_at", order: "desc" },
  source: "server",
  itemsPerPage: 10,
  actions: {
    name: "actions",
    title: "Actions",
    required: true,
    width: "100px",
    align: "center",
    items: ["modify", "delete", "print"],
  },
};

export const form = {
  formName:"login",
  title: "Login",
  submit: {
    label: "Login",
    actionEvent: "login",
  },
  cancel: { label: "", actionEvent: "logincancel" },
  controls: [
    {
      label: "E-Mail",
      id: "memberLogin",
      type: "email",
      placeholder: "E-mail",
      name: "memberLogin",
      validators: ["required=true"],
    },
    {
      label: "Password",
      id: "memberPwd",
      type: "password",
      placeholder: "password",
      name: "memberPwd",
      validators: ["required=true", "minimum=10", "maximum=30"],
    },
  ],
};
