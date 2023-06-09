import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../Redux/Slice";
import { useNavigate } from "react-router-dom";
const UserList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch<any>(fetchUserData());
  }, []);
  const Data: any = useSelector((state: any) => state.Slice.userData.results);

  const navigate = useNavigate();
  const columns: GridColDef[] = [
    {
      field: "f_name",
      headerName: "First Name",
      width: 180,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "l_name",
      headerName: "Last Name",
      width: 160,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email_id",
      headerName: "Email",
      width: 160,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      type: "number",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "address",
      headerName: "Address",
      type: "number",
      width: 160,
      headerAlign: "center",
      align: "center",
    },
  ];
  return (
    <div
      style={{
        position: "relative",
        // width: "100%",
        // height: "90vh",
        padding: "5rem 10rem 0rem 15rem",
        // borderRadius: "12px",
        display: "flex",
        gap: "2rem",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Button
        // component={Link}
        // to="/add"
        variant="contained"
        onClick={() => {
          navigate("/add_user");
        }}
        style={{
          fontFamily: "Poppins",
          padding: ".5rem 3rem",
        }}
      >
        Add User
      </Button>
      <Box sx={{ height: 400, width: "80%" }}>
        <DataGrid
          getRowId={(row: any) => row.email_id}
          rows={Data ? Data : []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          // checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default UserList;
