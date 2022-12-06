// export type partyData = {
//   host_id: number;
//   flat: string;
//   first_entry: Date;
//   vibe: number;
//   // Should be able to get user ID through token
// };
// Cannot set a string at Date type so have commented this out for now

// Function used in Signup and that also signs the User in automatically after Account Creation and brings user to home flow
const createParty = async (
  // These arguments need to be passed into the function in the preceding order when function is called
  host_id: Number,
  flat: String,
  first_entry: String,
  vibe: Number
): Promise<void> => {
  try {
    console.log("Reach createParty promise in partyService!");

    console.log(host_id);
    console.log(flat);
    console.log(first_entry);
    console.log(vibe);

    let response = await fetch(
      // ERROR: From Server --> Method Not Allowed
      `https://3c6c-193-61-207-186.eu.ngrok.io/api/party/v1/post/${host_id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          flat: flat,
          first_entry: first_entry,
          vibe: vibe,
        }),
      }
    );
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const partyService = {
  createParty,
};
