package vaja1.ris.vaja1Ris.services;

import org.apache.pdfbox.pdmodel.font.PDFont;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class PdfTextUtil {
    public static List<String> wrapText(String text, int maxWidith, PDFont font, float fontSize) throws IOException{
        List<String> lines = new ArrayList<>();
        if (text == null || text.isEmpty()) return lines;

        String[] words = text.split(" ");
        StringBuilder currentLine = new StringBuilder();

        for (String word : words) {
            String testLine = currentLine + word + " ";
            float widith = font.getStringWidth(testLine) / 1000 * fontSize;

            if (widith > maxWidith){
                lines.add(currentLine.toString());
                currentLine = new StringBuilder(word + " ");
            } else {
                currentLine.append(word).append(" ");
            }
        }

        lines.add(currentLine.toString());
        return lines;
    }
}
