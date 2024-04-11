export const search = {
    columns: [
      {
        name: "id",
        hidden: true,
      },
      {
        name: "name",
        displayName: "Name",
        width: "250px",
      },
      {
        name: "link",
        displayName: "Link",
        width: "250px",
      },
      {
        name: "parentName",
        path:"parent",
        ref:"Menu",
        refCol:"name",
        displayName: "Parent",
        width: "250px",
      },
      {
        name: "parentLink",
        path:"parent",
        ref:"Menu",
        refCol:"link",
        displayName: "Parent Link",
        width: "250px",
      }
    ],
    serialNo: {
      name: "serial_no",
      title: "#",
      required: true,
      width: "40px",
      align: "center",
    },
    paginated: true,
    initialSort: { name: "name", order: "asc" },
    source: "server",
    endPoint:"menus",
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
  