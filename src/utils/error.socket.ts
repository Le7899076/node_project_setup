
export function errorSocket(io:any, socket:any, error:any){
    io.to(socket.id).emit(
        "ERROR_RECEIVER",
        {
            status: false,
            message: error?.message || "Something Went Wrong"
        }
    )

}