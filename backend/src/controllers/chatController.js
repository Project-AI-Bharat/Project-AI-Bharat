import { runQueryPipeline } from "../rag/pipeline/queryPipeline.js";

export async function getChatResponse(req, res) {
  try {
    const { message } = req.body;
    const userId = req.user?.userId;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        message: "message is required",
        success: false,
      });
    }

    const response = await runQueryPipeline({
      question: message.trim(),
      userId,
    });

    return res.status(200).json({
      message: response.message,
      userId,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to process chat request",
      success: false,
    });
  }
}
