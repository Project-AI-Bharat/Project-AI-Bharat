import { queryPipeline } from "../rag/pipeline/queryPipeline.js";

export async function getChatResponse(req, res) {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required."
      });
    }

    const response = await queryPipeline(message.trim());

    return res.status(200).json({
      success: true,
      answer: response.answer,
      sources: response.sources
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to process chat request."
    });
  }
}