import userDetails from "../models/userDetails.js";

export async function getChatResponse(req, res) {
	try {
		const userId = req.user?.userId;

		return res.status(200).json({
			message: "Chat endpoint is ready",
			userId,
			success: true
		});
	} catch (error) {
		return res.status(500).json({
			message: "Failed to process chat request",
			success: false
		});
	}
}