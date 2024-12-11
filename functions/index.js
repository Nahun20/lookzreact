const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.assignRoleToUser = functions.https.onCall(async (data, context) => {
  // Verifica si el usuario está autenticado
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Solo los usuarios autenticados pueden asignar roles");
  }

  const userId = data.userId;
  const role = data.role;

  try {
    // Asigna el rol al usuario en la base de datos
    await admin.firestore()
      .collection("users")
      .doc(userId)
      .set(
        {rol: role},
        {merge: true},
      );


    return {message: "Rol asignado correctamente"};
  } catch (error) {
    throw new functions.https.HttpsError("internal", error.message, error);
  }
});
